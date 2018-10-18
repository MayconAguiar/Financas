import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {

  @Output() upload: EventEmitter<FileList> = new EventEmitter();

  constructor() { }
  
  ngOnInit() {
  }

  changeListener(files: FileList) {
    this.upload.emit(files);
  }
}
