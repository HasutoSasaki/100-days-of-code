import { TwitterApi } from 'twitter-api-v2';

/**
 * ツイート投稿機能
 * Twitter API v2を使用してツイートを投稿します
 */
async function postTweet(): Promise<void> {
    // 環境変数からAPIキーと認証情報を取得
    const {
        TWITTER_API_KEY,
        TWITTER_API_SECRET,
        TWITTER_ACCESS_TOKEN,
        TWITTER_ACCESS_SECRET,
        TWEET_TEXT
    } = process.env;

    // 必須パラメータのチェック
    if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
        console.error('Error: Twitter API認証情報が不足しています');
        process.exit(1);
    }

    if (!TWEET_TEXT) {
        console.error('Error: ツイート内容が指定されていません');
        process.exit(1);
    }

    try {
        // Twitter APIクライアントの初期化
        const twitterClient = new TwitterApi({
            appKey: TWITTER_API_KEY,
            appSecret: TWITTER_API_SECRET,
            accessToken: TWITTER_ACCESS_TOKEN,
            accessSecret: TWITTER_ACCESS_SECRET,
        });

        // ツイートの投稿
        const result = await twitterClient.v2.tweet(TWEET_TEXT);

        console.log('ツイートが正常に投稿されました');
        console.log(`Tweet ID: ${result.data.id}`);
        console.log(`Tweet URL: https://twitter.com/user/status/${result.data.id}`);
    } catch (error) {
        console.error('ツイート投稿中にエラーが発生しました:', error);
        process.exit(1);
    }
}

// スクリプト実行
postTweet().catch(error => {
    console.error('予期せぬエラーが発生しました:', error);
    process.exit(1);
});