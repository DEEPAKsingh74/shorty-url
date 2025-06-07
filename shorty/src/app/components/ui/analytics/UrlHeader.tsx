import Link from 'next/link';
import { FiTrash2, FiClock, FiCalendar } from 'react-icons/fi';

type UrlHeaderProps = {
    longUrl: string;
    shortUrl: string;
    createdAt: Date;
    expiresAt: string | null;
    onDelete: () => void;
};

export const UrlHeader = ({ longUrl, shortUrl, createdAt, expiresAt, onDelete }: UrlHeaderProps) => {
    // const copyToClipboard = () => {
    //     navigator.clipboard.writeText(shortUrl);
    // };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FiCalendar className="mr-1" />
                        <span>Created: {createdAt.toLocaleDateString()}</span>
                        {expiresAt && (
                            <>
                                <FiClock className="ml-4 mr-1" />
                                <span>Expires: {expiresAt}</span>
                            </>
                        )}
                    </div>
                </div>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 flex items-center"
                >
                    <FiTrash2 className="mr-1" /> Delete
                </button>
            </div>

            <div className="space-y-4">
                <Link
                    href={longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="text-sm font-medium text-gray-500">Original URL</p>
                    <p className="truncate text-blue-600">{longUrl}</p>
                </Link>
                <Link
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="text-sm font-medium text-gray-500">Short URL</p>
                    <div className="flex items-center">
                        <p className="text-blue-600 mr-2">{shortUrl}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};