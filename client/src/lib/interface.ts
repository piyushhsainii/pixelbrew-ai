export interface ImageData {
    is_image_safe: boolean;
    prompt: string;
    resolution: string;
    seed: number;
    style_type: string;
    url: string;
}

export interface ApiResponse {
    created: string;
    data: ImageData[];
}

export interface AllImages {
    id: string,
    prompt: string,
    url: string,
    createdAt: string,
    updatedAt: string,
    userEmail: string,
    isPublic: boolean,
    user: {
        id: string
        name: string
        email: string
        avatar_url: string
        createdAt: string
        updatedAt: string
        about: string
        provider: string
        trainingImg: string
        balance: number
    }
}[]