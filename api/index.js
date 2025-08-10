import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction
} from "@solana/web3.js";
import bs58 from "bs58";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      rpcUrl,
      senderSecretKey,
      receiverAddress,
      amountSol
    } = req.query;

    if (!rpcUrl || !senderSecretKey || !receiverAddress || !amountSol) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const connection = new Connection(rpcUrl, "confirmed");
    const senderKeypair = Keypair.fromSecretKey(bs58.decode(senderSecretKey));
    const receiverPubkey = new PublicKey(receiverAddress);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: receiverPubkey,
        lamports: parseFloat(amountSol) * 1_000_000_000
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [senderKeypair]
    );

    return res.status(200).json({
      message: "Transaction sent successfully",
      signature,
      explorer: `https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
