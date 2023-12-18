import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

export interface SeoMetadata {
    title: string;
    description: string;
}

@Injectable({
    providedIn: "root"
})
export class SeoService {
    constructor(private titleService: Title, private metaService: Meta) { }

    setMetadata(metada: SeoMetadata) : void {
        this.setTitle(metada.title);
        this.setDescription(metada.description);
    }
    
    private setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    private setDescription(description: string) {
        this.metaService.addTag({ 'name': 'description', 'property':'og:description', 'content': description})
        this.metaService.addTag({ 'name': 'twitter:description', 'property':'twitter:description', 'content': description})
        this.metaService.addTag({ 'name': 'og:description', 'property':'og:description', 'content': description})
    }
}