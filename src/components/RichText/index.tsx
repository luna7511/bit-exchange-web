import parse from "html-react-parser";

export default function RichText({ html = "" }: { html: string }) {
    return (
        <div className="rich-text">
            {parse(html)}
        </div>
    );
}