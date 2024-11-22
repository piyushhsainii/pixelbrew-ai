import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../components/ui/button';

const DownloadButton = ({
    url,
    filename = 'downloaded-file',
    data,
    variant = "default",
    className = ""
}) => {
    // Method 1: Direct URL download
    const handleUrlDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Method 2: Blob/Data download
    const handleDataDownload = () => {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    // Method 3: Fetch remote file
    const handleFetchDownload = async () => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className="space-y-4">
            {/* URL Download */}
            {url && !data && (
                <Button
                    variant={"default"}
                    className={`flex items-center gap-2 ${className}`}
                    onClick={handleUrlDownload}
                >
                    <Download className="" />

                </Button>
            )}

            {/* Data Download */}
            {data && !url && (
                <Button
                    variant={"default"}

                    className={`flex items-center gap-2 ${className}`}
                    onClick={handleDataDownload}
                >
                    <Download className="" />
                </Button>
            )}

            {/* Fetch Download */}
            {url && data && (
                <Button
                    variant={"default"}
                    className={`flex items-center gap-2 hover:bg-green-700 ${className}`}
                    onClick={handleFetchDownload}
                >
                    <Download className="" size={19} />
                    Download
                </Button>
            )}
        </div>
    );
};

export default DownloadButton;