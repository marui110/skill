// Client orchestration pattern (pseudocode — adapt types to your domain)

async function handleGenerate() {
  startTransition(async () => {
    const { batchId, items } = await generatePreviewAction(input);

    // 1. Immediate display
    const displayItems = items.map((item) => toDisplayModel(item, batchId));
    writeClientCache({ batchId, items: displayItems, savedAt: Date.now(), syncState: "cached" });
    setDisplayItems(displayItems);

    // 2. Background persist — do NOT await in UI path
    void syncBatchAction(batchId).then(
      () => patchSyncState("synced"),
      () => patchSyncState("failed"),
    );
  });
}

// On mount: restore from sessionStorage if batch still valid
useEffect(() => {
  const cached = readClientCache<DisplayItem>();
  if (cached) setDisplayItems(cached.items);
}, []);
