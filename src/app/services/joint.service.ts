import { Injectable } from '@angular/core';
import { InfoService } from "./info.service";

@Injectable({
  providedIn: 'root'
})
export class JointService {
  constructor(private readonly infoService: InfoService) { }
}

export const JointTaxBrackets2021: (() => Map<number, number>) = () => new Map([[10, 19750], [12, 80250], [22, 171050], [24, 326600], [32, 414700], [35, 622050], [37, 622051]]);