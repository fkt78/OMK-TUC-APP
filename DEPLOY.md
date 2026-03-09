# デプロイ手順

## 1. リポジトリ名の変更（必須）

URL を `https://fkt78.github.io/travel-unit-converter/` にするため、リポジトリ名を変更してください。

1. GitHub でリポジトリを開く
2. **Settings** → **General**
3. **Repository name** を `travel-unit-converter` に変更
4. **Rename** をクリック

## 2. GitHub Pages の有効化

1. **Settings** → **Pages**
2. **Source** で **GitHub Actions** を選択

## 3. デプロイ

`main` ブランチにプッシュすると、自動でビルド・デプロイされます。

```
git add .
git commit -m "Deploy setup"
git push origin main
```

## 4. 公開URL

デプロイ完了後（数分かかります）:

**https://fkt78.github.io/travel-unit-converter/**
