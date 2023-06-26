export interface DetailCarCompanyResponse{
    carCompanyId: string | null;
    carCompanyCode: string;
    carCompanyName: string;
    email: string;
    hotline: string;
    phoneNumber: string;
    officeAddress: string;
    image: string;
    newImage: File | null;
    description: string;
    thumnail: string;
    newThumnail: File | null;
    socialMediaResponses: SocialMediaResponse[];
    rate: number;
    rateCount: number;
    ratingList: RatingResponse[];
  }

  export interface DetailCarCompanyByUserSideResponse{
    carCompanyId: string | null;
    carCompanyCode: string;
    carCompanyName: string;
    email: string;
    hotline: string;
    phoneNumber: string;
    officeAddress: string;
    image: string;
    newImage: File | null;
    description: string;
    thumnail: string;
    newThumnail: File | null;
    rate: number,
    rateCount: number,
    socialMediaResponses: SocialMediaResponse[];
    ratingList: RatingResponse[];
  }

  export interface SocialMediaResponse{
    socialMediaCode: string;
    socialMediaName: string;
    link: string;
  }

  export interface RatingResponse{
    stt: number,
    rateId: string;
    senderId: string;
    senderName: string;
    senderImage: string;
    rate: number;
    content: string;
    createTime: string;
  }