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

export interface FalAIResponse {
    success: boolean,
    result: {
        data: {
            images: [
                {
                    url: string,
                    width: number,
                    height: number,
                    content_type: string
                }
            ],
            timings: any,
            seed: number,
            has_nsfw_concepts: [
                boolean
            ],
            prompt: string
        },
        requestId: string
    },
    prompt: string,
    url: string
}

export interface AdvancedResponseModel {
    data: {
        images: [
            {
                url: string,
                width: number,
                height: number,
                content_type: string
            }
        ],
        timings: {
            inference: number
        },
        seed: number,
        has_nsfw_concepts: any,
        prompt: string
    },
    requestId: string
}

export interface AllImages {
    id: string,
    prompt: string,
    Likes: number,
    url: string,
    createdAt: string,
    updatedAt: string,
    userEmail: string,
    isPublic: boolean,
    likes: {
        id: string
        postID: string
        userID: string
        likes: number
    }[]
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

export interface AllReviews {
    Improvement: string,
    review: string,
    userEmail: string,
    id: string,
    user: {
        name: string,
        avatar_url: string
    }
}
export interface TopPosts {
    id: string;
    prompt: string;
    url: string;
    isPublic: boolean;
    Likes: number;
    LikedBy: any
    createdAt: Date;
    updatedAt: Date;
    userEmail: string;
    user: {
        name: string;
        avatar_url: string;
    };

}

export interface userLikes {
    id: string,
    isLiked: boolean,
    postID: string,
    userEmail: String
}