import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public model: any;
  constructor() {
    this.model = this.createModel();
  }

  public ngOnInit() {
    //
  }

  /**
   * Resets the form controls data model to a predefined initial state
   */
  public createModel() {
    return {
      model: {
        label: 'Model',
        value: 'Soda Line 3000'
      },
      password: {
        label: 'Password',
        value: '',
        // tslint:disable-next-line
        description: 'This SodaBuilder is password protected, You cannot make soda without the password. Hint: The password is "password".',
        notMatch: 'The password is incorrect. Hint: try "password" instead.'
      },
      recipeType: {
        value: 'upload',
        label: 'Recipe:',
        options: {
          upload: { label: 'Upload', value: 'upload' },
          create: { label: 'Create', value: 'create' }
        }
      },
      upload: {
        value: null,
        label: 'Choose A Recipe',
        description: 'Only ".recipe" files are allowed.'
      },
      name: {
        label: 'Name',
        value: ''
      },
      details: {
        label: 'Description',
        value: ''
      },
      flavorMix: {
        label: 'Flavor Mix',
        value: {},
        options: {
          cola: { label: 'Cola', value: 'cola' },
          pepper: { label: 'Pepper', value: 'pepper' },
          orange: { label: 'Orange', value: 'orange' },
          grape: { label: 'Grape', value: 'grape' },
          lemonlime: { label: 'Lemon Lime', value: 'lemonlime' },
          cherry: { label: 'Cherry', value: 'cherry' },
          rootbeer: { label: 'Root Beer', value: 'rootbeer' }
        }
      },
      rootbeerType: {
        value: 'regular',
        label: 'Rootbeer Variant:',
        description: 'Choose the type of recipe. ',
        options: [
          { label: 'Regular', value: 'regular' },
          { label: 'Birch', value: 'birch' },
          { label: 'Sarsaparilla', value: 'sarsaparilla' }
        ]
      },
      carbinationLevel: {
        label: 'Carbination Level',
        value: 4,
        min: 0,
        max: 10,
        step: .5,
        toMuch: 7,
        toLittle: 2,
        // tslint:disable-next-line
        description: 'Carbination level as measuered in "volumes of CO2". 0 volumes will result in avery smooth soda while 10 volumes will produce a soda with a kick.',
        toMuchWarning: 'This soda will have quite a kick',
        toLittleWarning: 'This soda might be a little flat'
      },
      tags: {
        label: 'Tags',
        value: [],
        suggestions: ['sweet', 'spicy', 'smooth', 'knocks you socks off', 'full of flavor'],
        description: 'These tags will help others find your recipe in the intergalactic soda index.'
      },
      size: {
        value: 'can',
        label: 'Serving Size',
        options: [
          { label: 'Can (8oz)', value: 'can' },
          { label: 'Bottle (12oz)', value: 'smBottle' },
          { label: 'Md Bottle (1 L)', value: 'mdBottle' },
          { label: 'Lg Bottle (2 L)', value: 'lgBottle' }
        ]
      },
      extraSugar: {
        value: 25,
        min: 0,
        max: 100,
        step: 5,
        toMuch: 60,
        wayToMuch: 100,
        toLittle: 10,
        label: 'Extra Sugar',
        // tslint:disable-next-line
        description: 'Adding extra sugar to the soda will make it sweet and mask the chemical flavors, but will be even worse for your health.',
        toMuchWarning: 'This might be too sweet',
        toLittleWarning: 'This might not be sweet enough',
        wayToMuchError: 'Thats just downright dangerous'
      },
      isDiet: {
        value: false,
        label: 'Produce Diet Soda'
      },
      emergancyProduction: {
        // toggle-switch
        value: false,
        label: 'Emergency Production',
        // tslint:disable-next-line
        description: 'Turn this on if you need soda now! This will continuosly despense a stream of soda rather than filling each bottle then stopping.',
        warning: 'This could get messy...'
      }
    };
  }

}
