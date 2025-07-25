# Real-Time Orderbook Viewer with Order Simulation

A comprehensive Next.js application that displays real-time orderbook data from multiple cryptocurrency exchanges (OKX, Bybit, and Deribit) with advanced order simulation capabilities. This tool helps traders understand market impact and optimal timing for their orders.

## 🚀 Features

### Multi-Venue Orderbook Display

- **Real-time data** from OKX, Bybit, and Deribit exchanges
- **15+ orderbook levels** for both bids and asks
- **Live updates** via WebSocket connections and polling fallbacks
- **Seamless venue switching** with instant data updates
- **Spread calculation** and percentage display

### Order Simulation Form

- **Venue selector** (OKX, Bybit, Deribit)
- **Symbol input** with common cryptocurrency pairs
- **Order type selection** (Market, Limit)
- **Side selection** (Buy/Sell)
- **Price input** for limit orders
- **Quantity input** with validation
- **Timing simulation** (immediate, 5s, 10s, 30s delay)

### Order Placement Visualization

- **Visual order positioning** in the orderbook
- **Highlighted simulated orders** with distinct indicators
- **Order impact metrics**:
  - Estimated fill percentage
  - Market impact calculation
  - Slippage estimation
  - Time to fill analysis

### Market Depth Visualization

- **Interactive depth chart** using Recharts
- **Cumulative volume display**
- **Price level analysis**
- **Market structure insights**

### Responsive Design

- **Mobile-optimized** interface
- **Desktop trading scenarios** support
- **Intuitive navigation** between views
- **Dark theme** for reduced eye strain

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd orderbook-viewer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Rate Limiting (optional)
NEXT_PUBLIC_API_RATE_LIMIT=100
NEXT_PUBLIC_UPDATE_INTERVAL=2000

# Exchange API Keys (for production use)
OKX_API_KEY=your_okx_api_key
BYBIT_API_KEY=your_bybit_api_key
DERIBIT_API_KEY=your_deribit_api_key
```

### Exchange API Setup

The application uses public APIs for orderbook data. For production use with private APIs:

1. **OKX API**: [OKX API Documentation](https://www.okx.com/docs-v5/)
2. **Bybit API**: [Bybit API Documentation](https://bybit-exchange.github.io/docs/v5/intro)
3. **Deribit API**: [Deribit API Documentation](https://docs.deribit.com/)

## 📊 API Integration

### Supported Exchanges

#### OKX

- **Base URL**: `https://www.okx.com`
- **Orderbook Endpoint**: `/api/v5/market/books`
- **WebSocket**: `wss://ws.okx.com:8443/ws/v5/public`
- **Rate Limits**: 20 requests per 2 seconds

#### Bybit

- **Base URL**: `https://api.bybit.com`
- **Orderbook Endpoint**: `/v5/market/orderbook`
- **WebSocket**: `wss://stream.bybit.com/v5/public/linear`
- **Rate Limits**: 1200 requests per minute

#### Deribit

- **Base URL**: `https://www.deribit.com`
- **Orderbook Endpoint**: `/api/v2/public/get_order_book`
- **WebSocket**: `wss://www.deribit.com/ws/api/v2`
- **Rate Limits**: 1000 requests per hour

### Symbol Mapping

The application automatically maps common symbols to exchange-specific formats:

| Standard Symbol | OKX      | Bybit   | Deribit       |
| --------------- | -------- | ------- | ------------- |
| BTC-USD         | BTC-USDT | BTCUSDT | BTC-PERPETUAL |
| ETH-USD         | ETH-USDT | ETHUSDT | ETH-PERPETUAL |
| SOL-USD         | SOL-USDT | SOLUSDT | SOL-PERPETUAL |
| ADA-USD         | ADA-USDT | ADAUSDT | ADA-PERPETUAL |

## 🎯 Usage Guide

### 1. Selecting a Venue

- Click on the venue buttons (OKX, Bybit, Deribit) in the order simulation form
- The orderbook will automatically update to show data from the selected exchange

### 2. Choosing a Symbol

- Use the symbol selector in the orderbook viewer
- Available symbols: BTC-USD, ETH-USD, SOL-USD, ADA-USD
- Real-time data updates for the selected symbol

### 3. Simulating Orders

1. **Fill out the order form**:

   - Select venue and symbol
   - Choose order type (Market/Limit)
   - Set side (Buy/Sell)
   - Enter price (for limit orders)
   - Specify quantity
   - Choose timing

2. **Submit the simulation**:
   - Click "Simulate Order"
   - View impact metrics and warnings
   - See order positioning in the orderbook

### 4. Analyzing Results

- **Order Impact Analysis**: View fill percentage, market impact, slippage, and timing
- **Visual Indicators**: Highlighted order positions in the orderbook
- **Warnings**: High-impact order alerts with recommendations
- **Market Depth**: Interactive chart showing cumulative volume

## 🔍 Order Impact Analysis

### Market Orders

- **Fill Percentage**: Calculated based on available liquidity
- **Market Impact**: Number of price levels affected
- **Slippage**: Price deviation from best bid/ask
- **Time to Fill**: Based on timing simulation

### Limit Orders

- **Fill Percentage**: 100% for marketable orders, 0% for non-marketable
- **Market Impact**: Minimal for marketable orders
- **Slippage**: Zero for limit orders
- **Time to Fill**: Depends on market conditions and timing

## 🚨 Error Handling

The application includes comprehensive error handling:

- **API Failures**: Automatic fallback to mock data
- **Network Issues**: Retry mechanisms with exponential backoff
- **Rate Limiting**: Request throttling and queue management
- **Invalid Data**: Data validation and sanitization
- **WebSocket Disconnections**: Automatic reconnection attempts

## 📱 Responsive Design

The application is optimized for various screen sizes:

- **Desktop**: Full-featured interface with side-by-side layout
- **Tablet**: Responsive grid layout with touch-friendly controls
- **Mobile**: Stacked layout with simplified navigation

## 🔒 Security Considerations

- **API Keys**: Never exposed in client-side code
- **Rate Limiting**: Implemented to prevent API abuse
- **Data Validation**: All inputs validated and sanitized
- **CORS**: Proper cross-origin request handling
- **HTTPS**: Secure connections for all API calls

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## 📈 Performance Optimization

- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo for expensive calculations
- **Debouncing**: Input validation and API calls
- **Caching**: Orderbook data caching with TTL
- **Bundle Optimization**: Code splitting and tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Exchange APIs**: OKX, Bybit, and Deribit for providing public APIs
- **Open Source Libraries**: Next.js, React, Tailwind CSS, Recharts
- **Community**: Contributors and feedback from the trading community

## 📞 Support

For support and questions:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@orderbook-viewer.com

## 🔄 Changelog

### v1.0.0 (Current)

- Initial release with multi-venue orderbook support
- Order simulation capabilities
- Market depth visualization
- Responsive design implementation

### Planned Features

- Advanced order types (Stop-loss, Take-profit)
- Historical orderbook data
- Portfolio integration
- Advanced analytics and indicators
- Multi-language support
- Custom themes and layouts

---

**Note**: This application is for educational and demonstration purposes. Always verify data accuracy and consider market conditions before making trading decisions.
