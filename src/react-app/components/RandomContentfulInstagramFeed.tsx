import React, { useEffect, useState } from "react";
import client from "../contentfulClient";
import { MediaItem } from "../types/contentful";
import InstagramFeed from "./InstagramFeed";
import Spinner from "react-bootstrap/Spinner"; 
import { Container } from "react-bootstrap";

// Helper function to shuffle an array
const shuffleArray = (array: any[]) => {
    const arr = [...array]; 
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

interface RandomContentfulInstagramFeedProps {
    instagramUrl: string;
}

const RandomContentfulInstagramFeed: React.FC<RandomContentfulInstagramFeedProps> = ({ instagramUrl }) => {
    const [randomImageUrls, setRandomImageUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const IMAGE_LIMIT = 6;

        client
            .getEntries({ 
                content_type: "mediaItem",
                "fields.category": "Photo",
            })
            .then((response) => {
                const allImageUrls: string[] = [];

                response.items.forEach((item: any) => {
                    const fields: MediaItem["fields"] = item.fields;
                    const photo = fields.photo;

                    if (photo?.fields?.file?.contentType.startsWith("image/")) {
                        const mediaUrl = `https:${photo.fields.file.url}`;
                        allImageUrls.push(mediaUrl);
                    }
                });

                const shuffledUrls = shuffleArray(allImageUrls);
                setRandomImageUrls(shuffledUrls.slice(0, IMAGE_LIMIT));
            })
            .catch((error) => {
                console.error("Contentful fetch failed:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <section className="py-0 bg-light text-center position-relative">
                <Container fluid className="p-0 py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading Instagram feed...</span>
                    </Spinner>
                </Container>
            </section>
        );
    }
    
    return (
        <InstagramFeed 
            instagramUrl={instagramUrl} 
            images={randomImageUrls}
        />
    );
};

export default RandomContentfulInstagramFeed;
