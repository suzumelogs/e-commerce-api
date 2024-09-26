export declare class createProductDto {
    name: string;
    price: string;
    categoryId: string;
    description: string;
    images: Image[];
    sizes: Size[];
    colors: Color[];
    isFeatured: boolean;
    isArchived: boolean;
}
declare class Color {
    value: string;
}
declare class Size {
    value: string;
}
declare class Image {
    url: string;
}
export {};
