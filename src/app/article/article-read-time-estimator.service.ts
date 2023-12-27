import { readingTime } from "reading-time-estimator";


export class ArticleReadTimeEstimatorService {

    estimate(content: { description: string, content: string }): string {
        let text = content.description + " " + this.strip(content.content)
        return readingTime(text, 180).text
    }

    private strip(text: string) : string {
        return new DOMParser()?.parseFromString(text,"text/html")?.body?.textContent?? ''
    }
}