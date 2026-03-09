import React, { useEffect } from 'react';

export type LegalType = 'disclaimer' | 'terms' | 'privacy';

interface Props {
  type: LegalType;
  onClose: () => void;
}

const LEGAL_CONTENT: Record<LegalType, { title: string; content: string }> = {
  disclaimer: {
    title: '免責事項',
    content: `本アプリ「Travel Unit Converter」（以下「本アプリ」）のご利用にあたり、以下の点をご了承ください。

1. 変換結果について
本アプリが表示する通貨換算、単位変換の結果は参考値であり、実際の金融取引や商業取引における正確な価格を保証するものではありません。

2. 為替レートについて
為替レートは外部APIから取得しており、実時間での変動や金融機関が適用するレートとは異なる場合があります。実際の両替や決済時には、金融機関・両替所の公式レートをご確認ください。

3. 単位換算について
距離・重さ・温度・容量・速さなどの単位換算は一般的な換算率に基づいており、特殊な条件下では誤差が生じる可能性があります。

4. 責任の制限
本アプリの利用により生じた損害、不利益について、開発者および提供者は一切の責任を負いません。本アプリは「現状のまま」提供され、商用性や特定目的への適合性について保証いたしません。

5. オフライン時の利用
ネットワーク接続がない場合、キャッシュされた為替レートまたは概算値を使用します。オフライン時の表示値は参考程度としてご利用ください。`
  },
  terms: {
    title: '利用規約',
    content: `本利用規約（以下「本規約」）は、本アプリ「Travel Unit Converter」の利用に関する条件を定めるものです。本アプリをご利用いただくことで、本規約に同意したものとみなします。

第1条（適用）
本規約は、本アプリの利用者（以下「ユーザー」）と本アプリの提供者との間の利用条件を定めるものです。

第2条（利用）
1. ユーザーは、本アプリを個人の非商業目的で利用することができます。
2. 本アプリは無料で提供されていますが、将来有料化または仕様変更を行う可能性があります。

第3条（禁止事項）
ユーザーは、以下の行為を行ってはなりません。
- 本アプリの逆アセンブル、逆コンパイル、リバースエンジニアリング
- 本アプリの複製、改変、再配布
- 法令または公序良俗に反する利用
- 本アプリの運営を妨害する行為

第4条（免責）
1. 本アプリの内容の正確性、完全性、有用性について保証いたしません。
2. 本アプリの利用により生じた損害について、提供者は責任を負いません。

第5条（変更）
本規約は、予告なく変更される場合があります。変更後の規約は、本アプリ上での表示をもって効力を生じるものとします。

第6条（準拠法）
本規約は日本法に準拠し、本アプリに関する紛争は東京地方裁判所を第一審の専属的合意管轄裁判所とします。`
  },
  privacy: {
    title: 'プライバシーポリシー',
    content: `本プライバシーポリシーは、本アプリ「Travel Unit Converter」におけるユーザー情報の取扱いについて定めるものです。

1. 収集する情報
本アプリは、以下の情報を収集・保存する場合があります。
- 為替レートのキャッシュ（ローカルストレージに保存、24時間有効）
- 本アプリの利用状況に関する技術情報（エラー発生時のバージョン情報等）

2. 個人情報について
本アプリは、氏名、メールアドレス、住所等の個人を特定できる情報を収集しません。

3. 第三者サービス
本アプリは、為替レート取得のため外部API（exchangerate.host等）にアクセスします。API提供者のプライバシーポリシーが適用される場合があります。

4. ローカルストレージ
本アプリは、為替レートのキャッシュをブラウザのローカルストレージに保存します。このデータはお使いの端末内にのみ保存され、サーバーへ送信されません。

5. データの削除
キャッシュデータは、アプリ内のキャッシュクリア機能またはブラウザの設定により削除できます。

6. 変更
本ポリシーは、予告なく変更される場合があります。重要な変更がある場合は、本アプリ上でお知らせします。

7. お問い合わせ
本ポリシーに関するお問い合わせは、本アプリの提供元までご連絡ください。`
  }
};

const LegalModal: React.FC<Props> = ({ type, onClose }) => {
  const { title, content } = LEGAL_CONTENT[type];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="legal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2 id="legal-title">{title}</h2>
          <button type="button" className="legal-close" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>
        <div className="legal-modal-body">
          <pre className="legal-content">{content}</pre>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
