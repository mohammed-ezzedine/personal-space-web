import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

export interface SeoMetadata {
    title: string;
    description: string;
    imageUrl?: string;
}

@Injectable({
    providedIn: "root"
})
export class SeoService {
    constructor(private titleService: Title, private metaService: Meta) { }

    setMetadata(metada: SeoMetadata) : void {
        this.setTitle(metada.title);
        this.setDescription(metada.description);

        this.setImage(metada);

    }
    
    private setImage(metada: SeoMetadata) {
        if (metada.imageUrl) {
            this.metaService.addTag({ 'name': 'image', 'property': 'og:image', 'content': metada.imageUrl });
            this.metaService.addTag({ 'name': 'og:image', 'property': 'og:image', 'content': metada.imageUrl });
            this.metaService.addTag({ 'name': 'twitter:image', 'property': 'twitter:image', 'content': metada.imageUrl });
        }
    }

    private setTitle(title: string) {
        this.titleService.setTitle(title);
        this.metaService.addTag({ 'name': 'twitter:title', 'property':'twitter:title', 'content': title})
    }

    private setDescription(description: string) {
        this.metaService.addTag({ 'name': 'description', 'property':'og:description', 'content': description})
        this.metaService.addTag({ 'name': 'twitter:description', 'property':'twitter:description', 'content': description})
        this.metaService.addTag({ 'name': 'og:description', 'property':'og:description', 'content': description})
    }
}