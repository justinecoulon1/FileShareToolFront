export type RegisterStateForm = {
    error?: {
        name?: string[];
        email?: string[];
        passwordForm?: string[];
        serverError?: string;
    };
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export type LoginStateForm = {
    error?: {
        email?: string;
        password?: string;
        err?: string;
    };
    email?: string;
    password?: string;
};
