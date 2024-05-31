import { IIconProps } from "../../../interface/general";

const AddIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick} className={className}>
            <rect width="24" height="24" fill="#E5E5E5" />
            <g id="Light Outline">
                <rect x="-904" y="-875" width="1760" height="1011" rx="80" fill="white" />
                <g id="Add">
                    <path
                        id="Squircle"
                        d="M1 12C1 14.4477 1.13246 16.3463 1.46153 17.827C1.78807 19.2963 2.29478 20.2921 3.00136 20.9986C3.70794 21.7052 4.70365 22.2119 6.17298 22.5385C7.65366 22.8675 9.55232 23 12 23C14.4477 23 16.3463 22.8675 17.827 22.5385C19.2963 22.2119 20.2921 21.7052 20.9986 20.9986C21.7052 20.2921 22.2119 19.2963 22.5385 17.827C22.8675 16.3463 23 14.4477 23 12C23 9.55232 22.8675 7.65366 22.5385 6.17298C22.2119 4.70365 21.7052 3.70794 20.9986 3.00136C20.2921 2.29478 19.2963 1.78807 17.827 1.46153C16.3463 1.13246 14.4477 1 12 1C9.55232 1 7.65366 1.13246 6.17298 1.46153C4.70365 1.78807 3.70794 2.29478 3.00136 3.00136C2.29478 3.70794 1.78807 4.70365 1.46153 6.17298C1.13246 7.65366 1 9.55232 1 12Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path id="Vector 193" d="M12 8V12M12 16V12M12 12H16H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </g>
        </svg>
    );
};

export default AddIcon;
