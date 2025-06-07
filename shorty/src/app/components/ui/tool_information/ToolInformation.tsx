import { ReactNode } from 'react';
import { FaChartLine, FaLock, FaLink,FaQrcode } from 'react-icons/fa';
import { MdTimer } from "react-icons/md";

type FeatureCardProps = {
    icon: ReactNode;
    title: string;
    description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-100 text-indigo-600">
                {icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-center text-gray-600">{description}</p>
        </div>
    );
};

type SectionHeaderProps = {
    title: string;
    subtitle: string;
};

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    );
};

const ToolInformation = () => {
    const features: FeatureCardProps[] = [
        {
            icon: <FaLink className="w-6 h-6" />,
            title: "Instant URL Shortening",
            description: "Transform long links into short, memorable URLs in seconds with our lightning-fast processor."
        },
        {
            icon: <FaChartLine className="w-6 h-6" />,
            title: "Advanced Analytics",
            description: "Gain insights with real-time click tracking, geographic data, and referral sources."
        },
        {
            icon: <FaLock className="w-6 h-6" />,
            title: "Secure Links",
            description: "Protect sensitive content with password protection and expiration dates for your links."
        },
        {
            icon: <FaQrcode className="w-6 h-6" />,
            title: "QR Code Generation",
            description: "Create QR codes for your shortened URLs to bridge the physical-digital gap."
        },
        {
            icon: <MdTimer className="w-6 h-6" />,
            title: "More Url control",
            description: "Control how and when the url will expire based on time, number of clicks or country where the link is opened."
        },
        {
            icon: <MdTimer className="w-6 h-6" />,
            title: "Mobile or Descktop",
            description: "Control where the url will be shown mobile or desktop."
        },

    ];

    return (
        <section className="py-16 md:py-20 bg-gray-50 mt-16" id='tool-info'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="More Than Just Link Shortening"
                    subtitle="Our advanced URL shortener provides powerful features to manage, track, and optimize your links."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Ready to supercharge your links?</h3>
                    <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                        Get Started For Free
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ToolInformation;