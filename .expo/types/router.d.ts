/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}/quen-mat-khau` | `/quen-mat-khau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}/sign-up` | `/sign-up`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}/qr-code` | `/qr-code`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/BodyComponent` | `/BodyComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/DonationComponent` | `/DonationComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/khen-thuong-hien-mau` | `/khen-thuong-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/notification` | `/notification`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/ProfileInformationComponent` | `/ProfileInformationComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/SliderComponent` | `/SliderComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/van-ban` | `/van-ban`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}/cau-tra-loi` | `/cau-tra-loi`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}/cau-hoi-dang-ky-hien-mau` | `/cau-hoi-dang-ky-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(tieu-chuan-khen-thuong)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-lai-giay-chung-nhan-hien-mau` | `/yeu-cau-cap-lai-giay-chung-nhan-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau` | `/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(khen-thuong)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(khen-thuong)'}/khen-thuong-chi-tiet` | `/khen-thuong-chi-tiet`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(lich-su-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(lich-su-hien-mau)'}/lich-su-hien-mau-chi-tiet` | `/lich-su-hien-mau-chi-tiet`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(profile)'}/cap-nhat-profile` | `/cap-nhat-profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(profile)'}` | `/`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(login)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(login)'}/quen-mat-khau` | `/quen-mat-khau`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(login)'}/sign-up` | `/sign-up`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}/qr-code` | `/qr-code`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}/BodyComponent` | `/BodyComponent`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}/DonationComponent` | `/DonationComponent`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}/khen-thuong-hien-mau` | `/khen-thuong-hien-mau`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}/notification` | `/notification`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}/ProfileInformationComponent` | `/ProfileInformationComponent`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}/SliderComponent` | `/SliderComponent`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}/van-ban` | `/van-ban`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}/cau-tra-loi` | `/cau-tra-loi`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}/cau-hoi-dang-ky-hien-mau` | `/cau-hoi-dang-ky-hien-mau`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(tieu-chuan-khen-thuong)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-lai-giay-chung-nhan-hien-mau` | `/yeu-cau-cap-lai-giay-chung-nhan-hien-mau`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau` | `/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(khen-thuong)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(khen-thuong)'}/khen-thuong-chi-tiet` | `/khen-thuong-chi-tiet`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(lich-su-hien-mau)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(lich-su-hien-mau)'}/lich-su-hien-mau-chi-tiet` | `/lich-su-hien-mau-chi-tiet`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(profile)'}/cap-nhat-profile` | `/cap-nhat-profile`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(main)'}${'/(profile)'}` | `/`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(login)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(login)'}/quen-mat-khau${`?${string}` | `#${string}` | ''}` | `/quen-mat-khau${`?${string}` | `#${string}` | ''}` | `${'/(login)'}/sign-up${`?${string}` | `#${string}` | ''}` | `/sign-up${`?${string}` | `#${string}` | ''}` | `${'/(main)'}/qr-code${`?${string}` | `#${string}` | ''}` | `/qr-code${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}/BodyComponent${`?${string}` | `#${string}` | ''}` | `/BodyComponent${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}/DonationComponent${`?${string}` | `#${string}` | ''}` | `/DonationComponent${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}/khen-thuong-hien-mau${`?${string}` | `#${string}` | ''}` | `/khen-thuong-hien-mau${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}/notification${`?${string}` | `#${string}` | ''}` | `/notification${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}/ProfileInformationComponent${`?${string}` | `#${string}` | ''}` | `/ProfileInformationComponent${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}/SliderComponent${`?${string}` | `#${string}` | ''}` | `/SliderComponent${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}/van-ban${`?${string}` | `#${string}` | ''}` | `/van-ban${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}/cau-tra-loi${`?${string}` | `#${string}` | ''}` | `/cau-tra-loi${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}/cau-hoi-dang-ky-hien-mau${`?${string}` | `#${string}` | ''}` | `/cau-hoi-dang-ky-hien-mau${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(tieu-chuan-khen-thuong)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-lai-giay-chung-nhan-hien-mau${`?${string}` | `#${string}` | ''}` | `/yeu-cau-cap-lai-giay-chung-nhan-hien-mau${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau${`?${string}` | `#${string}` | ''}` | `/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(khen-thuong)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(khen-thuong)'}/khen-thuong-chi-tiet${`?${string}` | `#${string}` | ''}` | `/khen-thuong-chi-tiet${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(lich-su-hien-mau)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(lich-su-hien-mau)'}/lich-su-hien-mau-chi-tiet${`?${string}` | `#${string}` | ''}` | `/lich-su-hien-mau-chi-tiet${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(profile)'}/cap-nhat-profile${`?${string}` | `#${string}` | ''}` | `/cap-nhat-profile${`?${string}` | `#${string}` | ''}` | `${'/(main)'}${'/(profile)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}/quen-mat-khau` | `/quen-mat-khau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(login)'}/sign-up` | `/sign-up`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}/qr-code` | `/qr-code`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/BodyComponent` | `/BodyComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/DonationComponent` | `/DonationComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/khen-thuong-hien-mau` | `/khen-thuong-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/notification` | `/notification`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/ProfileInformationComponent` | `/ProfileInformationComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/SliderComponent` | `/SliderComponent`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}/van-ban` | `/van-ban`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}/cau-tra-loi` | `/cau-tra-loi`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(cau-hoi-thuong-gap)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}/cau-hoi-dang-ky-hien-mau` | `/cau-hoi-dang-ky-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(lich-to-chuc-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(tieu-chuan-khen-thuong)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-lai-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-lai-giay-chung-nhan-hien-mau` | `/yeu-cau-cap-lai-giay-chung-nhan-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(home)'}${'/(yeu-cau-cap-nhat-giay-chung-nhan-hien-mau)'}/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau` | `/yeu-cau-cap-nhat-giay-chung-nhan-hien-mau`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(khen-thuong)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(khen-thuong)'}/khen-thuong-chi-tiet` | `/khen-thuong-chi-tiet`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(lich-su-hien-mau)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(lich-su-hien-mau)'}/lich-su-hien-mau-chi-tiet` | `/lich-su-hien-mau-chi-tiet`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(profile)'}/cap-nhat-profile` | `/cap-nhat-profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(main)'}${'/(profile)'}` | `/`; params?: Router.UnknownInputParams; };
    }
  }
}
