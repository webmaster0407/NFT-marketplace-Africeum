import styles from "./index.module.css";

const Create = () => {
  return (
    <div className={styles.container}>
      <p className={styles.create}>Create and sell your NFTs</p>
      <div className={styles.content}>
        <div className={styles.info}>
          <img src="https://opensea.io/static/images/icons/wallet.svg" />
          <p className={styles.title}>Set up your wallet</p>
          <p className={styles.para}>
            Once you&apos;ve set up your wallet of choice, connect it to Africeum
            by clicking the wallter icon in the top right corner. Learn about
            the
            <span>wallets we support.</span>
          </p>
        </div>
        <div className={styles.info}>
          <img src="https://opensea.io/static/images/icons/collection.svg" />
          <p className={styles.title}>Create your collection</p>
          <p className={styles.para}>
            Click <span>My Collections</span>{`and set up your collection. Add
            social links, a description, profile & banner images, and set a
            secondary sales fee.`}
          </p>
        </div>
        <div className={styles.info}>
          <img src="https://opensea.io/static/images/icons/nft.svg" />
          <p className={styles.title}>Add your NFTs</p>
          <p className={styles.para}>
            Upload your work (image, video, audio, or 3D art), add a title and
            description, and customize your NFTs with properties, stats, and
            unlockable content.
          </p>
        </div>
        <div className={styles.info}>
          <img src="https://opensea.io/static/images/icons/sale.svg" />
          <p className={styles.title}>List them for sale</p>
          <p className={styles.para}>
            Choose between auctions, fixed-price listings, You choose how you
            want to sell your NFTs, and we help you sell them!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Create;
