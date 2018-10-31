IMAGE := timdaub/ERC721-wallet

test:
	true
image:
	docker build -t $(IMAGE) .
push-imagee:
	docker push $(IMAGE)
.PHONY: image push-image test
