export declare class CategoriesResponseDto {
    id: string;
    name: string;
    storeId: string;
    billboard: {
        label: string;
    };
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<CategoriesResponseDto>);
}
export declare class CreateCategoryDto {
    name: string;
    billboardId: string;
    gender: string;
    imageUrl: string;
}
