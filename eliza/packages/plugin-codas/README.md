# CoDAS Plugin

A comprehensive plugin for the Conflux DeFi Agent Swarm (CoDAS) that provides data integration with CoinGecko and DefiLlama APIs.

## Features

### Current Features

#### Data Providers

1. **CoinGecko Provider**
   - Real-time cryptocurrency prices
   - Market capitalization data
   - Trading volume metrics
   - Historical price data
   - Token metadata
   - Exchange listings
   - Market pairs information

2. **DefiLlama Provider**
   - Protocol TVL tracking
   - Token price feeds
   - Yield farming analytics
   - Protocol metrics
   - Historical TVL data
   - Market statistics
   - Liquidity analysis
   - APY/APR calculations

## Installation

```bash
pnpm add @elizaos/plugin-codas
```

## Usage

```typescript
import { codasPlugin } from '@elizaos/plugin-codas';

// Initialize the plugin
const codasPlugin = new codasPlugin();

// Use CoinGecko provider
const prices = await codasPlugin.coingecko.getPrices(['CFX', 'BTC', 'ETH']);

// Use DefiLlama provider
const tvl = await codasPlugin.defillama.getTVL('conflux');
```

## Configuration

```env
# API keys for increased rate limits
COINGECKO_API_KEY=your_api_key
DEFILLAMA_API_KEY=your_api_key
```

## Roadmap

### Future Actions

1. **Market Analysis Actions**
   - Price trend analysis
   - Volume analysis
   - Market sentiment analysis
   - Technical indicator calculations
   - Price prediction models
   - Volatility analysis
   - Correlation analysis
   - Market depth analysis

2. **Portfolio Actions**
   - Portfolio tracking
   - Performance analysis
   - Risk assessment
   - Rebalancing suggestions
   - Tax reporting
   - PnL calculations
   - Historical performance
   - Portfolio optimization

3. **Trading Actions**
   - Order execution
   - Rebalancing
   - Position management
   - Risk management
   - Strategy execution
   - Trade monitoring
   - Performance tracking
   - Trade analysis
   - Automated trading

### Future Evaluators

1. **Market Evaluators**
   - Price movement evaluation
   - Volume analysis
   - Trend identification
   - Pattern recognition
   - Market sentiment
   - Volatility assessment
   - Liquidity analysis
   - Market efficiency

2. **Risk Evaluators**
   - Portfolio risk assessment
   - Market risk evaluation
   - Volatility measurement
   - Correlation analysis
   - Drawdown analysis
   - VaR calculations
   - Stress testing
   - Risk-adjusted returns

3. **Performance Evaluators**
   - Return calculations
   - Benchmark comparison
   - Attribution analysis
   - Efficiency metrics
   - Cost analysis
   - Strategy evaluation
   - Historical performance
   - Peer comparison

### Future Providers

1. **Analytics Provider**
   - Custom analytics
   - Machine learning models
   - Predictive analytics
   - Historical analysis
   - Pattern detection
   - Anomaly detection
   - Trend analysis
   - Market insights

2. **Social Sentiment Provider**
   - Social media analysis
   - News sentiment
   - Community metrics
   - Trend detection
   - Influencer tracking
   - Content analysis
   - Engagement metrics
   - Market sentiment

3. **On-Chain Data Provider**
   - Transaction analysis
   - Wallet tracking
   - Smart contract events
   - Gas analytics
   - Network metrics
   - Token transfers
   - Contract interactions
   - Protocol usage

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Support

For support, please open an issue on GitHub.
