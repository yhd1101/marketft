import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import langEn from './lang.en';
import langKo from './lang.ko';
import langJp from './lang.jp';
import langCN from './lang.cn';

const resource =  {
    'en-US': {
        translation: langEn
    },
    'ko-KR': {
        translation: langKo
    },
    'jp-JP':{
        translation: langJp
    },
    'cn-CN':{
      translation: langCN
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources: resource,
        // 초기 설정 언어
        lng: 'en-US',
        fallbackLng: {
            'ko-KR':['ko-KR'],
            'jp-JP':['jp-JP'],
            'cn-CN':['ch-CN'],
            default:['en-US']
        },
        debug: true,
        defaultNS: 'translation',
        ns: 'translation',
        keySeparator: false,
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    })

export default i18n;