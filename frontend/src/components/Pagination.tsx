import { useEffect, useState } from "react";
import { PaginationParams } from "../types/application/Pagination";

interface PaginationProps {
    count: number;
    pageSize?: number;
    setPagination: (params: PaginationParams) => void;
}

function Pagination(props: PaginationProps): JSX.Element {
    const { count, pageSize = 10, setPagination } = props;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const pageCount = Math.ceil(count / pageSize);

    useEffect(() => {
        console.log("paginationParams", {
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
        });
        setPagination({
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
        });
    }, [currentPage]);

    return (
        <div className="join">
            <button
                className="join-item btn"
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                «
            </button>
            <span className="join-item btn">Página {currentPage}</span>
            <button
                className="join-item btn"
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                »
            </button>
        </div>
    );
}

export default Pagination;
