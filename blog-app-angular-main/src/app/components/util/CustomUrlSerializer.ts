import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {
    let dus = new DefaultUrlSerializer();
    console.log(url);
    if(/\/\//.test(url)) {
      url = url.replace(/\/\//, '/');
    }
    return dus.parse(url);
  }
  serialize(tree: UrlTree): any {
    let dus = new DefaultUrlSerializer(),
      path = dus.serialize(tree);
    return path;
  }
}
