# デプロイ手順

## 1. GitHub Pages の有効化

1. **Settings** → **Pages**
2. **Source** で **GitHub Actions** を選択

## 2. デプロイ

`main` ブランチにプッシュすると、自動でビルド・デプロイされます。

```
git add .
git commit -m "Deploy setup"
git push origin main
```

## 3. 公開URL

デプロイ完了後（数分かかります）:

**https://fkt78.github.io/OMK-TUC-APP/**
