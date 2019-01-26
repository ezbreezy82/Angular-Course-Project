import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.open') toggleDropdown: boolean = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
    }

    @HostListener('click') click(eventData: Event) {
        this.toggleDropdown = !this.toggleDropdown;
    }

    // @HostListener('mouseenter') mouseover(eventData: Event) {
    //     this.toggleDropdown = true;
    // }

    // @HostListener('mouseleave') mouseleave(eventData: Event) {
    //     this.toggleDropdown = false;
    // }
}