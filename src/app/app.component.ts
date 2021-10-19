import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { DataService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {
    nationId: 1,
    cityId: 1
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'First Name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
      },
    },
    {
      key: 'Last Name',
      type: 'input',
      templateOptions: {
        label: 'Last Name',
        placeholder: 'Last Name',
        required: true,
      },
    },
    {
      key: 'Comments- Text Area',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Comments- Text Area',
        placeholder: 'Enter amount',
      },
    },
    {
      key: 'date_of_birth',
      type: 'datepicker',
      templateOptions: {
        label: 'Datepicker',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      },
    },
    {
      key: 'terms',
      type: 'checkbox',
      templateOptions: {
        label: 'Accept terms',
        description: 'This is a checkbox',
        required: true,
      },
    },

    {
      key: 'terms',
      type: 'toggle',
      templateOptions: {
        label: 'Accept terms',
        description: 'Do you like options?',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        placeholder: 'Enter description',
      },
    },
    {
      key: 'multiselect',
      type: 'select',
      templateOptions: {
        label: 'Multi-select',
        multiple: true,
        options: [
          { label: 'Iron Man', value: 'iron_man' },
          { label: 'Captain America', value: 'captain_america' },
          { label: 'Black Widow', value: 'black_widow' },
          { label: 'Hulk', value: 'hulk' },
          { label: 'Captain Marvel', value: 'captain_marvel' },
        ],
      },
    },
    {
      key: 'nationId',
      type: 'select', // <select>
      templateOptions: {
        label: 'Nation',
        options: this.dataService.getNations(),
      },
    },
    {
      key: 'cityId',
      type: 'select', // <select>
      templateOptions: {
        label: 'Cities',
        options: [],
      },
      hooks: {
        onInit: (field?: FormlyFieldConfig) => {
          console.log(field);
          if (field && field.templateOptions) {
            console.log(field);
            field: {

              templateOptions: {
              
              options:   field?.form?.get('nationId')?.valueChanges?.pipe(
                  startWith(this.model.nationId),
                  switchMap((nationId) =>
                    this.dataService.getCities(nationId)
                  )
                )
              
              
              }
              
              }
            
          }
        },
      },
    },
  ];
  constructor(private dataService: DataService) {}
  onSubmit() {
    alert(JSON.stringify(this.model));
  }
  title = 'formly-poc';
}
