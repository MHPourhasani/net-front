import { IIconProps } from "../../../interface/general";

const SearchIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick} className={className}>
            <path
                d="M1 11.4783C1 15.8486 1.78302 18.3581 3.30283 19.8237C4.83125 21.2975 7.35021 21.9565 11.4783 21.9565C15.6063 21.9565 18.1253 21.2975 19.6537 19.8237C21.1735 18.3581 21.9565 15.8486 21.9565 11.4783C21.9565 7.10793 21.1735 4.59845 19.6537 3.13291C18.1253 1.65907 15.6063 1.00002 11.4783 1.00002C7.35021 1.00002 4.83125 1.65907 3.30283 3.13291C1.78302 4.59845 1 7.10793 1 11.4783Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M22.9565 22.9565L20.3478 20.3478" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default SearchIcon;
