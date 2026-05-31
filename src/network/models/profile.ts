export interface Profile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_photo_path: string;
    email_verified_at: Date;
    two_factor_secret: string;
    two_factor_recovery_codes: string;
    two_factor_confirmed_at: string;
    created_at: Date;
    updated_at: Date;
    profile_photo_url: string;
}