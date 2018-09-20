import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

import { UserService } from './user.service';

@Injectable()
export class ApiService {


  sessionid: string;

  constructor(
    public _http: HttpClient,
    private _userService: UserService

  ) {

  }


  get_header() {


    let headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return headers.set('Authorization', this._userService.getToken());


  }

  post(modulo, params): Observable<any> {
    let jsondata = JSON.stringify(params);
    /*
    if (this.sessionid)
      params['sessionid'] = this.sessionid;
      */
    //let jsondata = this.json_to_string(params);
    return this._http.post(GLOBAL.url + modulo, jsondata, { headers: this.get_header() });
  }

  otro_post(url, modulo, params): Observable<any> {
    let jsondata = JSON.stringify(params);
    return this._http.post(url + modulo, jsondata, { headers: this.get_header() });
  }

  put(modulo, params): Observable<any> {
    let jsondata = JSON.stringify(params);
    return this._http.put(GLOBAL.url + modulo, jsondata, { headers: this.get_header() });
  }

  get(modulo, params = null): Observable<any> {
    let jsondata = (params) ? JSON.stringify(params) : '';
    return this._http.get(GLOBAL.url + modulo, { params: params, headers: this.get_header() });
  }





  geocoding(modulo, params: any): Observable<any> {
    //params['format'] = 'jsonv2';
    console.log("dire", params);
    //let jsondata = this.json_to_string(params[0]);
    let jsondata = (params) ? JSON.stringify(params[0]) : '';

    let filtroPhoton: string = '';

    if (params[1]) {
      filtroPhoton += params[1];
    }
    if (params[2]) {
      filtroPhoton += ':' + params[2];
    }
    if (filtroPhoton != '') {
      filtroPhoton = '&osm_tag=' + filtroPhoton;
    }
    console.log(filtroPhoton);
    console.log("jsondata", jsondata, params);
    //let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${params.lat}&lon=${params.lon}`;
    let url = GLOBAL.url_geolocalizacion + modulo + '/?' + jsondata + filtroPhoton;


    return this._http.get(url, { headers: this.get_header() });
  }

  delete(modulo, params = null): Observable<any> {
    let jsondata = (params) ? JSON.stringify(params) : '';
    return this._http.delete(GLOBAL.url + modulo + jsondata, { headers: this.get_header() });
  }



  makeFileRequest(carpeta: string, params: Array<string>, files: Array<File>, name: string) {

    return new Promise(function(resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      }

      xhr.open('POST', this.url + carpeta, true);
      xhr.setRequestHeader('Authorization', this._userService.getToken());
      xhr.send(formData);
    });

  }

  /*
    json_to_string(params: any) {
      return Object.entries(params).map(e => e.join('=')).join('&');
    }

  */


}
