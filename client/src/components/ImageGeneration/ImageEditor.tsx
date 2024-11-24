import { useEffect, useRef, useState } from "react";
import { useToast } from "../../hooks/use-toast";
import axios from "axios";
import { BACKEND_URL } from "../../lib/url";
import { userCompleteInfo } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

export const TestImageEditor = ({
    editMode,
    setEditMode,
    id,
    url
}: {
    editMode: boolean,
    setEditMode: any,
    id: string,
    url: string
}) => {
    const editorContainerRef = useRef(null); // Reference to the container
    const [isEditorLoaded, setIsEditorLoaded] = useState(false); // Track script loading
    const [isEditorInitialized, setIsEditorInitialized] = useState(false); // Track editor initialization
    const [userInfo, setuserInfo] = useRecoilState(userCompleteInfo)
    const email = userInfo?.user?.email
    const { toast } = useToast()
    const savePromptsToDb = async (imageUrl: string) => {
        try {
            const formData = new FormData();
            formData.append('file', imageUrl)
            formData.append('upload_preset', 'ideogram')
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dzow59kgu/image/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            if (response) {
                const { data, status } = await axios.post(`${BACKEND_URL}/updateModifiedURL`, {
                    id: id,
                    url: response.data.secure_url,

                })
                if (status == 200) {
                    toast({
                        title: "Added Image to My Images",
                        variant: "default",
                        className: "bg-primmaryColor text-white font-sans border-gray-800 border",
                    });
                }
            }

        }
        catch {
            toast({
                title: "Something went wrong while adding image to gallery",
                variant: "default",
                className: "bg-primmaryColor text-white font-sans border-gray-800 border",
            });
        }
    }

    const handleFetchDownload = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'pixelbrewAI.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    useEffect(() => {
        // if (!isEditorLoaded || !editorContainerRef.current) return;

        const { FilerobotImageEditor } = window as any;

        // Wait until FilerobotImageEditor is fully defined
        if (!FilerobotImageEditor || !FilerobotImageEditor.TABS || !FilerobotImageEditor.TOOLS) {
            console.error("FilerobotImageEditor is not fully initialized.");
            return;
        }

        // Initialize the editor
        const config = {
            previewPixelRatio: 9,
            savingPixelRatio: 20,
            source: url,
            onSave: (editedImageObject, designState) => {
                console.log("Saved Image Object:", editedImageObject);
                console.log("Design State:", designState);
                handleFetchDownload(editedImageObject.imageBase64)
                savePromptsToDb(editedImageObject.imageBase64)
            },
            annotationsCommon: { fill: "#ff0000" },
            Text: { text: "Filerobot..." },
            Rotate: { angle: 90, componentType: "slider" },
            tabsIds: [
                FilerobotImageEditor.TABS.ADJUST,
                FilerobotImageEditor.TABS.ANNOTATE,
                FilerobotImageEditor.TABS.WATERMARK,
                FilerobotImageEditor.TABS.RESIZE,
                FilerobotImageEditor.TABS.FINETUNE
            ],
            defaultTabId: FilerobotImageEditor.TABS.ANNOTATE,
            defaultToolId: FilerobotImageEditor.TOOLS.TEXT,
        };

        const filerobotImageEditor = new FilerobotImageEditor(editorContainerRef.current, config);

        filerobotImageEditor.render({
            onClose: (closingReason) => {
                console.log("Editor closed, reason:", closingReason);
                filerobotImageEditor.terminate();
                setEditMode(false)
            },
        });

        setIsEditorInitialized(true);

        return () => {
            filerobotImageEditor.terminate(); // Cleanup on unmount
        };
    }, [isEditorLoaded]);

    return (
        <div className="text-white">
            {editMode &&
                <div ref={editorContainerRef} className="h-[85vh]" />
            }
            {!isEditorInitialized && editMode && <p>Loading editor...</p>}
        </div>
    );
};
