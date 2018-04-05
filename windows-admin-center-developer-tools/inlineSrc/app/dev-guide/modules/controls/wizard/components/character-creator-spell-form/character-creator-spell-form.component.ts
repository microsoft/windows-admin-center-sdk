import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WizardStepComponent } from '@msft-sme/shell/angular';
import { CharacterCreatorParams } from '../../models/character-creator-params';
import { Spell } from '../../models/spell';

@Component({
    selector: 'sme-ng2-character-creator-name-form',
    styles: [`
      h1, h2, h3, h4, h5, h6 {
          margin: 0;
          padding: 0;
      }
    `],
    template: `
      <h4>Choose a Spell</h4>
      <form [formGroup]="form">
        <div class="form-controls">
          <div class="form-group">
            <div class="form-input">
              <label for="spell">{{ spellLabel }}</label>
              <div class="combobox">
                <select class="form-control" id="spell" formControlName="spell" [(ngModel)]="model.spell">
                  <option *ngFor="let spell of spells" [ngValue]="spell">{{ spellMap[spell] }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    `
})
export class CharacterCreatorSpellFormComponent extends WizardStepComponent<CharacterCreatorParams> implements OnInit {
    public spellLabel: string;

    public form: FormGroup;

    public spells: Spell[];

    public spellMap: { [index: number]: string };

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    public ngOnInit(): void {
        this.spellLabel = 'Magical Spells';

        this.spells = [
            Spell.Aero,
            Spell.Fire,
            Spell.Stone,
            Spell.Thunder,
            Spell.Water
        ];

        this.spellMap = {};
        this.spellMap[Spell.Aero] = 'Aero';
        this.spellMap[Spell.Fire] = 'Fire';
        this.spellMap[Spell.Water] = 'Water';
        this.spellMap[Spell.Stone] = 'Stone';
        this.spellMap[Spell.Thunder] = 'Thunder';

        this.form = this.formBuilder.group({
            spell: this.model.spell
        });
    }
}
