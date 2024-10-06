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