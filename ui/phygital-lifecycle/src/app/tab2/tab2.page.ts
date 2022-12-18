import { Component, OnInit } from '@angular/core';
import {
  carGeneralDetails,
  carIdentifiers,
  carTechnicalDetails,
} from '../constants/car_data';
import { DigicarService } from '../services/digicar.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  renderSegment: Map<string, boolean> = new Map([
    ['general', true],
    ['identifiers', false],
    ['technical', false],
  ]);
  generalDetails: any[] = carGeneralDetails;
  technicalDetails: any[] = carTechnicalDetails;
  identifiers: any[] = carIdentifiers;

  constructor(private digicar: DigicarService) {}

  changeSegment(activatedSegment: string) {
    this.renderSegment.forEach((v, k) => {
      if (activatedSegment == k) {
        this.renderSegment.set(activatedSegment, true);
      } else {
        this.renderSegment.set(k, false);
      }
    });
  }

  segmentChange(event: any) {
    this.changeSegment(event.detail.value);
  }

  async setDetails() {
    const res = await this.digicar.readCarNft();
    this.generalDetails = [
      {
        property: 'Make',
        propertyDetails: res?.make,
      },
      {
        property: 'Model',
        propertyDetails: res?.model,
      },
      {
        property: 'Color',
        propertyDetails: res?.color,
      },
      {
        property: 'Year',
        propertyDetails: res?.year,
      },
      {
        property: 'Price',
        propertyDetails: "30,000 $",
      },
    ];

    const ownerAddress =  await this.digicar.getOwnerAddress();
    this.identifiers = [
      {
        property: "Driving Plates",
        propertyDetails: "SUI-2022"
      },
      {
        property: "Serial Number",
        propertyDetails: res?.sn
      },
      {
        property: "Owner",
        propertyDetails: '0x' + ownerAddress
      }
    ]

    this.technicalDetails = [
      {
        property: "Distance",
        propertyDetails: res?.km + " km"
      },
      {
        property: "Engine Location",
        propertyDetails: res?.engine_location
      },
      {
        property: "Drive Wheels",
        propertyDetails: res?.drive_wheel
      },
      {
        property: "Fuel Type",
        propertyDetails: "Gas"
      }
    ]
  }

  ngOnInit(): void {
    this.setDetails();
  }
}
