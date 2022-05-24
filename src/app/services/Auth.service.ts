import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthDto } from '../dto/AuthDto';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends GenericService {
  constructor(private http: HttpClient) {
    super(http);
    this.apiURL = environment.serverBackUrl + 'api/auth';
  }
  public async LoginAsync(entity: AuthDto): Promise<any> {
    return await new Promise<boolean>((resolve, reject) => {
      if (entity.userName === 'admin' && entity.password == 'admin') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}
