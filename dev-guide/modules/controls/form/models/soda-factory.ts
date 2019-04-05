export function generateSodaFactory() {
    return {
        model: {
            label: 'Model',
            value: 'Soda Line 3000',
            description: '<The model description>'
        },
        password: {
            label: 'Password',
            value: '',
            // tslint:disable-next-line
            description: 'This SodaBuilder is password protected, You cannot make soda without the password.\n##_Hint: The password is "password"._',
            notMatch: 'The password is incorrect. Hint: try "password" instead.',
            required: 'You must enter a password'
        },
        confirm: {
            label: 'Confirm Password',
            value: '',
            required: 'You must confirm the password'
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
            description: 'Only ".recipe" files are allowed.',
            breadcrumbs: [
                {
                    label: 'item 1',
                    emphasized: true,
                    action: event => alert('item 1')
                },
                {
                    label: 'item 2',
                    action: event => alert('item 2')
                },
                {
                    label: 'item 3',
                    emphasized: true
                }
            ]
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
            label: 'Flavor Mix Checklist',
            value: [],
            label2: 'Flavor Mix Combobox',
            value2: [],
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
        carbonationLevel: {
            label: 'Carbonation Level',
            value: 4,
            min: 0,
            max: 10,
            step: .5,
            toMuch: 7,
            toLittle: 2,
            // tslint:disable-next-line
            description: 'Carbonation level as measured in "volumes of CO2". 0 volumes will result in avery smooth soda while 10 volumes will produce a soda with a kick.',
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
            ],
            description: '<the size description>'
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
        dietSweetener: {
            value: null,
            label: 'Sweetener',
            options: [
                { label: 'Aspartame', value: 'aspartame' },
                { label: 'Sucralose', value: 'sucralose' },
                { label: 'No Sweetener', value: null }
            ]
        },
        emergencyProduction: {
            // toggle-switch
            value: false,
            label: 'Emergency Production',
            // tslint:disable-next-line
            description: 'Turn this on if you need soda now! This will continuously dispense a stream of soda rather than filling each bottle then stopping.',
            warning: 'This could get messy...'
        },
        orderedList: {
            label: 'Ordered List',
            value: ['cola', 'pepper'],
            options: [
                { label: 'Cola', value: 'cola' },
                { label: 'Pepper', value: 'pepper' },
                { label: 'Orange', value: 'orange' },
                { label: 'Grape', value: 'grape' }
            ]
        },
        list: {
            label: 'Sous-chefs List',
            value: ['John Doe', 'Jane Doe']
        },
        inlineRadio: {
            value: 'optionA',
            innerValues: ['', '', ''],
            label: 'Inline Radio Group:',
            options: [
                { label: 'Option A', value: 'optionA' },
                { label: 'Option B', value: 'optionB' },
                { label: 'Option C', value: 'optionC' }
            ]
        },
        quotes: {
            value: [
                {
                    customerName: 'Bill',
                    location: 'Texas',
                    quote: 'So good it will kick your teeth out!'
                },
                {
                    customerName: 'Sally',
                    location: 'Arkansas',
                    quote: `Ain't nothing like this Sarsaparilla!`
                }
            ],
            heading: 'Customer {0}',
            label: 'Customer Quotes',
            newValue: {
                customerName: '',
                location: '',
                quote: ''
            },
            fields: {
                customerName: { label: 'Name' },
                location: { label: 'Location' },
                quote: { label: 'Quote' }
            }
        }
    };
}
