import { router } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CryptoPaySelector } from '../components/CryptoPaySelector'
import type { Coin } from '../constants/types'

export default function WalletScreen() {
  const handleSelectCoin = (coin: Coin) => {
    router.push({ pathname: '/send/[coinId]', params: { coinId: coin.id } })
  }

  return (
    <SafeAreaView style={styles.safe}>
      <CryptoPaySelector onSelect={handleSelectCoin} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000000',
  },
})