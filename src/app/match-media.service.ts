import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchMediaService {

  constructor() { }

  rules =
  {
      print: 'print',
      screen: 'screen',
      phone: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 1024px)',
      desktop: '(min-width: 1025px)',
      portrait: '(orientation: portrait)',
      landscape: '(orientation: landscape)',
      retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
  };

  Check = function (mq) {
      if (!mq) {
          return;
      }

      return window.matchMedia(mq).matches;
  };

/**********************************************
  METHODS FOR CHECKING TYPE
**********************************************/
  IsPhone(callBack) {
     this.IsGeneric(this.rules.phone, callBack);
  }

  IsTablet (callBack) {
    this.IsGeneric(this.rules.tablet, callBack);
  }

  private IsGeneric(rule: string, callBack) {
    if (window.matchMedia(rule).matches) {
       callBack();
    }
  }

  IsDesktop () {
      return window.matchMedia(this.rules.desktop).matches;
  }

  IsPortrait () {
      return window.matchMedia(this.rules.portrait).matches;
  }

  IsLandscape () {
      return window.matchMedia(this.rules.landscape).matches;
  }

  IsRetina () {
      return window.matchMedia(this.rules.retina).matches;
  }


/**********************************************
  EVENT LISTENERS BY TYPE
**********************************************/
  OnPhone(callBack) {
    this.OnGeneric(this.rules.phone, callBack);
  }

  OnTablet(callBack) {
    this.OnGeneric(this.rules.tablet, callBack);
  }

  private OnGeneric(rule: string, callBack) {
    const mql = window.matchMedia(rule);

    mql.addListener((evento: MediaQueryListEvent) => {
        if (evento.matches) {
            callBack(evento);
        }
    });
  }

  // OnTablet(callBack)
  // {
  //     if (typeof callBack === 'function')
  //     {
  //         var mql: MediaQueryList = window.matchMedia(this.rules.tablet);

  //         mql.addListener((mql: MediaQueryList) =>
  //         {
  //             if (mql.matches)
  //             {
  //                 callBack(mql);
  //             }
  //         });
  //     }
  // };

  // OnDesktop(callBack)
  // {
  //     if (typeof callBack === 'function')
  //     {
  //         var mql: MediaQueryList = window.matchMedia(this.rules.desktop);

  //         mql.addListener((mql: MediaQueryList) =>
  //         {
  //             if (mql.matches)
  //             {
  //                 callBack(mql);
  //             }
  //         });
  //     }
  // };

  // OnPortrait(callBack)
  // {
  //     if (typeof callBack === 'function')
  //     {
  //         var mql: MediaQueryList = window.matchMedia(this.rules.portrait);

  //         mql.addListener((mql: MediaQueryList) =>
  //         {
  //             if (mql.matches)
  //             {
  //                 callBack(mql);
  //             }
  //         });
  //     }
  // };

  // OnLandscape(callBack)
  // {
  //     if (typeof callBack === 'function')
  //     {
  //         var mql: MediaQueryList = window.matchMedia(this.rules.landscape);

  //         mql.addListener((mql: MediaQueryList) =>
  //         {
  //             if (mql.matches)
  //             {
  //                 callBack(mql);
  //             }
  //         });
  //     }
  // };
}
