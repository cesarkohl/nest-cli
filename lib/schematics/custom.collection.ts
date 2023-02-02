import { description } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { AbstractCollection } from './abstract.collection';
import { Schematic } from './nest.collection';

export interface CollectionSchematic {
  factory: string;
  schema: string;
  aliases: string[];
}

export class CustomCollection extends AbstractCollection {
  public getSchematics(): Schematic[] {
    this.collection;
    const collectionPackagePath = dirname(require.resolve(this.collection));
    const collectionPath = join(collectionPackagePath, 'collection.json');
    const collection = JSON.parse(readFileSync(collectionPath).toString());
    const schematics = Object.entries(collection.schematics).map(
      ([name, value]) => {
        const schematic = value as CollectionSchematic;
        const description = schematic.description;
        const alias = schematic?.aliases?.length ? schematic.aliases[0] : '';
        return { name, description, alias };
      },
    );

    return schematics;
  }
}
