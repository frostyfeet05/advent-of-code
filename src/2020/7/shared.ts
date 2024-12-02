export const input = ``;

type Bag = string;
type ContainerBag = {
    bag: Bag;
    amount: number;
};
type Rule = {
    bag: Bag;
    container: ContainerBag[];
}
export const Rule = {
    parse: (input: string): Rule[] => {
        return input.split('\n')
            .map(line => line.replace('.', ''))
            .map(line => {
                const [bag, contains] = line.split(' bags contain ');

                let container: ContainerBag[];
                if (contains === 'no other bags') {
                    container = [];
                } else {
                    container = contains.split(', ').map(c => {
                        const regex = c.match(/(\d+) ([a-z]+ [a-z]+)/) || [];
                        const amount = parseInt(regex[1]);
                        const containerBag = regex[2];
                        return {bag: containerBag, amount};
                    });
                }
                return {bag, container};
            }, {});
    },
    canContain: (bag: Bag, rule: Rule, rules: Rule[]): boolean => {
        const bags = rule.container.map(c => c.bag);
        if (bags.includes(bag)) {
            return true;
        }
        if (bags.length === 0) {
            return false;
        }
        return rules
            .filter(rule => bags.includes(rule.bag))
            .some(rule => Rule.canContain(bag, rule, rules));
    },
    amountFitInBag: (bag: Bag, rules: Rule[]): number => {
        const rule = rules.find(rule => rule.bag === bag);
        if (rule === undefined) {
            return 0;
        }
        if (rule.container.length === 0) {
            return 0;
        }
        return rule.container.reduce((sum, container) => sum + container.amount + (container.amount * Rule.amountFitInBag(container.bag, rules)), 0);
    }
};
