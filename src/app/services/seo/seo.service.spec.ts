import { Meta, Title } from "@angular/platform-browser";
import { SeoService } from "./seo.service"

describe("When setting the SEO metadata", () => {
    let seoService: SeoService;
    let titleService = {
        setTitle: () => jest.fn()
    } as unknown as Title;

    let metaService = {
        addTag: () => jest.fn()
    } as unknown as Meta;

    beforeEach(() => {
        seoService = new SeoService(titleService, metaService)
    })

    it("should update the title of the page", () => {
        let setTitleSpy = jest.spyOn(titleService, 'setTitle')
        seoService.setMetadata({ title: 'title', description: 'description' })
        expect(setTitleSpy).toHaveBeenCalledWith('title');
    })

    it("should update the description of the page", () => {
        let addTagSpy = jest.spyOn(metaService, 'addTag')
        seoService.setMetadata({ title: 'title', description: 'my-description' })
        expect(addTagSpy).toHaveBeenCalledWith({ 'name': 'description', 'property':'og:description', 'content': 'my-description'})
        expect(addTagSpy).toHaveBeenCalledWith({ 'name': 'twitter:description', 'property':'twitter:description', 'content': 'my-description'})
        expect(addTagSpy).toHaveBeenCalledWith({ 'name': 'og:description', 'property':'og:description', 'content': 'my-description'})
    })
})