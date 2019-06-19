import { Component } from '@angular/core';
import { NavigationTitle } from '@msft-sme/angular';

@Component({
    selector: 'sme-dev-guide-styles-animation',
    templateUrl: './animation.component.html'
})
@NavigationTitle({
    getTitle: () => 'Animation'
})
export class AnimationComponent {

    public toggleAnimation(event: MouseEvent, ...animations: string[]) {
        const target = (event.currentTarget as HTMLElement).children.item(0);
        this.processAnimations(target, 0, animations);
    }

    private processAnimations(target: Element, index: number, animations: string[]) {
        target.classList.add(animations[index]);
        setTimeout(
            () => {
                target.classList.remove(animations[index]);
                index++;
                if (animations.length > index) {
                    this.processAnimations(target, index, animations);
                }
            },
            1000);
    }
}
