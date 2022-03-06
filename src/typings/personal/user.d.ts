export type UpdateUser = {
    email: string,
    phone: string,
    birthDay: string,
    gender: string,
    lang: string,
};

export type UpdatePasswordUser = {
    currentPass: string,
    newPass: string,
};

export type UpdateAvatarUser = {
    image: string,
};

export type PostResponse = APIResponse & {
    data: User;
    message: string;
};

export type User = {
    _id: string;
    email: string,
    phone: string,
    fullname: string,
    company: {
        _id: string,
        name: string,
        sign: string,
        image: string
    },
    department: {
        _id: string,
        name: string,
        sign: string
    },
    signature: string,
    status: number,
    level: number,
    image: string
    gender: number,
    lang: string,
    birthDay: string
};