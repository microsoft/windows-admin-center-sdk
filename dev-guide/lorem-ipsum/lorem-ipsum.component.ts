import { Component, HostBinding } from '@angular/core';

// tslint:disable
export const LoremIpsumP1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet et urna vitae porttitor. In vehicula viverra odio a lobortis. Vivamus semper fermentum posuere. Ut sagittis justo tempus felis facilisis varius. Maecenas egestas dapibus ipsum sed laoreet. Nunc tempus, nibh tempus malesuada tristique, mauris sem convallis nisl, at porttitor eros lacus ac mauris. Suspendisse dignissim vulputate neque, quis gravida erat congue a. Integer volutpat scelerisque quam sed vulputate. Aenean sed hendrerit sapien, accumsan mattis ipsum. Suspendisse egestas sem sollicitudin augue congue, vitae suscipit quam sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue dapibus leo ut maximus.';
export const LoremIpsumP2 = 'Nulla sed mi vitae risus viverra vulputate. Morbi tempus vestibulum risus semper tristique. In id dictum risus. Cras molestie dolor ligula. Duis vestibulum vehicula eleifend. Suspendisse lacus felis, laoreet vel imperdiet et, cursus id augue. Aenean id congue mi, in bibendum urna. Pellentesque hendrerit congue ex, vel gravida ex rutrum sit amet. Curabitur vel leo dui. Phasellus tincidunt nibh non ante mollis, ut consectetur magna tristique. Quisque mollis sem quis tellus vestibulum, sed tincidunt dolor pretium.';
export const LoremIpsumP3 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec porttitor dui. Suspendisse potenti. Maecenas convallis eleifend nisl, ut laoreet turpis interdum sit amet. Vestibulum tempus urna in velit vehicula dapibus. Nullam ligula orci, consequat sit amet malesuada id, luctus sed tellus. Suspendisse potenti.';
export const LoremIpsumP4 = 'Praesent et mattis nibh, sit amet auctor augue. Curabitur sed fringilla lectus. Fusce tincidunt, tortor ac rutrum commodo, odio nunc volutpat sem, sit amet fermentum diam erat quis sapien. Curabitur placerat sem nec scelerisque feugiat. Morbi at mauris pharetra, molestie ante quis, rhoncus metus. Curabitur scelerisque sodales tortor a ultrices. Proin at accumsan sapien. Maecenas mollis mi sit amet lorem euismod tempus. Vivamus viverra nec lectus sit amet dictum. Aliquam tincidunt, ante non sodales blandit, eros quam lacinia nibh, quis tincidunt diam diam consequat purus.';
export const LoremIpsumP5 = 'In varius, mauris at suscipit fringilla, nunc metus gravida metus, in tincidunt magna odio sed metus. Etiam sed purus et diam sodales euismod. Sed scelerisque ultricies metus et aliquam. Phasellus ultrices vulputate mauris et maximus. Morbi non orci a diam interdum luctus. Proin interdum posuere nulla sit amet ultrices. Aenean ut magna at metus convallis gravida sed at libero.';
export const LoremIpsum = [LoremIpsumP1, LoremIpsumP2, LoremIpsumP3, LoremIpsumP4, LoremIpsumP5].join('\n\n');
// tslint:enable

@Component({
    selector: 'sme-lorem-ipsum',
    template: '<p>{{loremIpsum1}}</p><p>{{loremIpsum2}}</p><p>{{loremIpsum3}}</p><p>{{loremIpsum4}}</p><p>{{loremIpsum5}}</p>'
})
export class LoremIpsumComponent {
    public loremIpsum1 = LoremIpsumP1;
    public loremIpsum2 = LoremIpsumP2;
    public loremIpsum3 = LoremIpsumP3;
    public loremIpsum4 = LoremIpsumP4;
    public loremIpsum5 = LoremIpsumP5;

    @HostBinding('class.sme-documentation')
    public defaultClasses = true;
}
