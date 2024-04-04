const AxeLoggingHelper = Java.loadClass('net.dries007.tfc.util.AxeLoggingHelper');

let modifyAndRemoveCustomLoot = (/** @type {Internal.LootModificationEventJS} */ event) => {
  event
    .addBlockLootModifier('#afc:rubber_fig_logs')
    .apply(c => {
      try {
        let st = c.destroyedBlock.getBlockState();
        let isLogging = AxeLoggingHelper.isLoggingBlock(st);
        // console.log(`isLogging: ${isLogging}`);
        if (isLogging) {
          // c.addLoot(LootEntry.withChance('rootsclassic:verdant_sprig', chances.verdant_sprig))

          c.addLoot(LootEntry.withChance('gtceu:sticky_resin', 0.8));
    
        }
      } catch (e) {
        console.error(e)
      }
    });
}