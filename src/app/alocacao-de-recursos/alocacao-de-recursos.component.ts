import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-alocacao-de-recursos',
  templateUrl: './alocacao-de-recursos.component.html',
  styleUrls: ['./alocacao-de-recursos.component.scss']
})

export class AlocacaoDeRecursosComponent implements OnInit, AfterViewInit {

  constructor() { }

  // @ViewChild('header') header: ElementRef;
  // sticky;
  status = true;

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.sticky = this.header.nativeElement.offsetTop;
  }


  // @HostListener('window.scroll', ['$event'])
  // onScroll(evento) {
  //   if (window.pageYOffset > this.sticky) {
  //     this.header.nativeElement.classList.add('sticky');
  //   } else {
  //     this.header.nativeElement.classList.remove('sticky');
  //   }
  // }

  flip() {
      this.status = !this.status;
  }

}
