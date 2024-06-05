import { Link } from "react-router-dom";
import noDataImage from "../../assets/images/png/no-data.png";

interface Props {
    imgSrc?: any;
    className?: string;
    imgClassName?: string;
    title?: string;
    description?: string;
    linkHref?: string;
    linkTitle?: string;
}

const EmptyState = ({ imgSrc, className, imgClassName, title, description, linkHref, linkTitle }: Props) => {
    return (
        <div className={`flex h-full w-full flex-1 flex-col items-center justify-center gap-8 p-4 md:p-0 ${className}`}>
            <img src={imgSrc ? imgSrc : noDataImage} alt={title || "empty"} className={`w-1/2 xl:w-6/12 ${imgClassName}`} />
            {title && <span className="text-lg">{title}</span>}
            {description && <p className="text-center text-lg">{description}</p>}

            {linkHref && linkTitle ? (
                <Link
                    to={linkHref}
                    className="flex w-9/12 items-center justify-center rounded-xl bg-sky-400 py-2.5 text-white transition-all ease-in-out hover:bg-sky-500 md:max-w-3xl lg:py-3 xl:max-w-[200px]"
                >
                    {linkTitle}
                </Link>
            ) : null}
        </div>
    );
};

export default EmptyState;
