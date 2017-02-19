import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app works!';
  isLink = true;
  age = 10000.955;
  csvUrl: string = '/assets/return/return.csv';  // URL to web API
  htmlUrl: string = '/assets/html/event.html';
  csvData: any[] = [];
  eventContent : string = '';

  constructor (private http: Http) {
    this.readHtmlData();
    this.readCsvData();
  }

  readHtmlData(){
    this.http.get(this.htmlUrl)
    .subscribe(
      data => this.setEventContent(data),
      err => this.handleError(err)
    );
  }

  private setEventContent(res: Response){
    this.eventContent = res['_body'] || '';
  }

  readCsvData () {
    this.http.get(this.csvUrl)
    .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
    );
  }

  private extractData(res: Response) {
    let csvData = res['_body'] || '';

    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        console.log(allTextLines[i]);
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    this.csvData = lines;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

}
